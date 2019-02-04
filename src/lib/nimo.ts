
export enum Status {
  Pending    = "pending",
  Todo       = "todo",
  Done       = "done",
  Blocked    = "blocked",
  Cancel     = "cancel",
  InProgress = "in_progress"
}

export interface Transition {
  start: Status;
  end:   Status;
}

interface Event {
  transition: Transition;
  status:     Status;
}

export class Task {
  workflow:    Transition[];
  history:     Event[];
  summary:     string;
  description: string;
  uuid:        string;

  constructor(summary: string, description: string) {
    this.summary     = summary;
    this.description = description;
    this.workflow    = Task.transitions();
    this.uuid        = "";
    this.history     = [this.initialEvent()];
  }

  changeTransition(transition: Transition) : boolean {
    if (!this.canTransition(transition)) {
      return false;
    };

    const newTransition = this.workflow.find(
      x => (x.start == transition.start) && (x.end == transition.end)
    );

    if (newTransition == undefined) {
      return false;
    } else {
      const new_event = this.createEvent(newTransition);
      this.history.push(new_event);
      return true;
    }
  }

  currentStatus() : Status {
    return this.lastEvent().status;
  }

  lastEvent() : Event {
    return this.history[this.history.length - 1];
  }

  canTransition(transition : Transition) : boolean {
    if(transition.start == this.currentStatus()) {
      return true;
    } else {
      return false;
    }
  }

  private initialEvent() : Event {
    const event: Event = {
      transition: {
        start: Status.Pending,
        end: Status.Todo
      },
      status: Status.Todo
    };

    return event;
  }

  private createEvent(transition : Transition) : Event {
    const event: Event = {
      transition: transition,
      status: transition.end
    }

    return event;
  }

  static transitions() : Transition[] {
    const transitions: Transition[] = [
      {start: Status.Pending,    end: Status.Todo},
      {start: Status.Todo,       end: Status.InProgress},
      {start: Status.Todo,       end: Status.Cancel},
      {start: Status.Todo,       end: Status.Done},
      {start: Status.Todo,       end: Status.Blocked},
      {start: Status.InProgress, end: Status.Todo},
      {start: Status.InProgress, end: Status.Done},
      {start: Status.InProgress, end: Status.Blocked},
      {start: Status.InProgress, end: Status.Cancel},
      {start: Status.Done,       end: Status.Todo},
      {start: Status.Done,       end: Status.InProgress},
      {start: Status.Done,       end: Status.Cancel},
      {start: Status.Done,       end: Status.Blocked},
      {start: Status.Blocked,    end: Status.Todo},
      {start: Status.Blocked,    end: Status.InProgress},
      {start: Status.Blocked,    end: Status.Cancel},
      {start: Status.Blocked,    end: Status.Done},
      {start: Status.Cancel,     end: Status.Todo},
      {start: Status.Cancel,     end: Status.InProgress},
      {start: Status.Cancel,     end: Status.Blocked},
      {start: Status.Cancel,     end: Status.Done}
    ]

    return transitions;
  }
}

export class Project {
  name:        string;
  description: string;
  tasks:       Task[];
  uuid:        string;

  constructor(name: string, description: string) {
    this.name        = name;
    this.description = description;
    this.tasks       = [];
    this.uuid        = "";
  }
}
