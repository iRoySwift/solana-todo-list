export * from "./initializeUser";
export * from "./addTodo";
export * from "./testUser";
export * from "./removeTodo";
export * from "./updateTodo";
export * from "./markTodo";

export enum MyInstruction {
  InitializeUser,
  AddTodo,
  UpdateTodo,
  MarkTodo,
  RemoveTodo,
}
