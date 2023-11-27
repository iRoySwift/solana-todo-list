use anchor_lang::prelude::*;
pub mod error;
pub mod instructions;
pub mod states;

use crate::instructions::*;

declare_id!("6jgtKSDrYm7eNRK9FWjLiY2CswUfFzAwj6nfddfKLA6B");

#[program]
pub mod anchor_dapp_todo {

    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        instructions::initialize_user::initialize_user(ctx)
    }
    pub fn add_todo(ctx: Context<AddTodo>, content: String) -> Result<()> {
        instructions::add_todo::add_todo(ctx, content)
    }
    pub fn mark_todo(ctx: Context<MarkTodo>, todo_idx: u8) -> Result<()> {
        instructions::mark_todo::mark_todo(ctx, todo_idx)
    }
    pub fn update_todo(ctx: Context<UpdateTodo>, todo_idx: u8, content: String) -> Result<()> {
        instructions::update_todo::update_todo(ctx, todo_idx, content)
    }
    pub fn remove_todo(ctx: Context<RemoveTodo>, todo_idx: u8) -> Result<()> {
        instructions::remove_todo::remove_todo(ctx, todo_idx)
    }
}
