import { serialize } from "borsh";

type iInitializeUser = {
  instruction: number;
};

export class InitializeUser {
  instruction: number;
  constructor(props: iInitializeUser) {
    this.instruction = props.instruction;
  }
  toBuffer(): Buffer {
    return Buffer.from(serialize(InitializeUserSchema, this));
  }
}

const InitializeUserSchema = new Map([
  [InitializeUser, { kind: "struct", fields: [["instruction", "u8"]] }],
]);
