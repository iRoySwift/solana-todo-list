use anchor_lang::prelude::*;

pub mod instructions;
pub mod states;

use instructions::*;

declare_id!("6jgtKSDrYm7eNRK9FWjLiY2CswUfFzAwj6nfddfKLA6B");

#[program]
pub mod solana_todo_list {

    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        initialize_user::initialize_user(ctx)
    }
    pub fn add_todo(ctx: Context<AddTodo>, content: String) -> Result<()> {
        instructions::add_todo::add_todo(ctx, content)
    }
    pub fn delete_todo(ctx: Context<DeleteTodo>) -> Result<()> {
        delete_todo::delete_todo(ctx)
    }
}
