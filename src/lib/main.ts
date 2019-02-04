import { Status, Transition, Project, Task } from "./nimo";

let p = new Project("wedding planning", "yo something");

let t = new Task("buy Drinks", "buying drinks");

p.tasks.push(t);

const newTransition : Transition = {start: Status.Todo, end: Status.InProgress};

t.changeTransition(newTransition)

const badTransition : Transition = {start: Status.Done, end: Status.Blocked}

t.changeTransition(badTransition)

const newTransitiona : Transition = {start: Status.InProgress, end: Status.Blocked};

const anotherBadTransition : Transition = {start: Status.Blocked, end: Status.Blocked};

t.changeTransition(anotherBadTransition)