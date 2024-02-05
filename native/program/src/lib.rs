pub mod error;
pub mod instructions;
pub mod states;

use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg,
    program_error::PrintProgramError, pubkey::Pubkey,
};

use crate::error::TodoError;
use crate::states::UpdateTodoContent;

entrypoint!(process_instruction);

#[derive(BorshDeserialize, BorshSerialize, Debug)]
pub enum MyInstruction {
    InitializeUser,
    AddTodo(String),
    UpdateTodo(UpdateTodoContent),
    MarkTodo(u8),
    RemoveTodo(u8),
}

// Bafci6rXFhEHazHVeoBUToLhRzGJ3vvgKhKmobFhuiy8
pub fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // !testUser
    // let instruction = UserAccount::try_from_slice(instruction_data);
    // if let Ok(user_account) = instruction {
    //     msg!(
    //         "data:{:?},user_account:{:?}",
    //         instruction_data,
    //         user_account
    //     );
    //     if let Err(err) =
    //         instructions::initialize_user::initialize_user(program_id, accounts, user_account)
    //     {
    //         err.print::<TodoError>();
    //         return Err(err);
    //     }
    // }
    // match instruction {
    //     Ok(user_accout) => instructions::initialize_user(program_id, accounts, user_account),
    //     Err(err) => Err(err),
    // }

    // * MyInstruction
    let instruction = MyInstruction::try_from_slice(instruction_data)?;
    msg!("data:{:?},instruction:{:?}", instruction_data, instruction);
    if let Err(err) = match instruction {
        MyInstruction::InitializeUser => instructions::initialize_user(program_id, accounts),
        MyInstruction::AddTodo(content) => instructions::add_todo(program_id, accounts, content),
        MyInstruction::UpdateTodo(update_todo_state) => {
            instructions::update_todo(program_id, accounts, update_todo_state)
        }
        MyInstruction::MarkTodo(idx) => instructions::mark_todo(program_id, accounts, idx),
        MyInstruction::RemoveTodo(idx) => instructions::remove_todo(program_id, accounts, idx),
    } {
        err.print::<TodoError>();
        return Err(err);
    }
    Ok(())
}
