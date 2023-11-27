use anchor_lang::prelude::*;

use crate::error::TodoError;
use crate::states::{TodoAccount, UserAccount};

pub fn update_todo(ctx: Context<UpdateTodo>, todo_idx: u8, content: String) -> Result<()> {
    msg!("update_todo idx:{}", todo_idx);
    let todo_account = &mut ctx.accounts.todo_account;
    require!(!todo_account.marked, TodoError::UpdateContentMarked);
    todo_account.content = content;
    Ok(())
}

#[derive(Accounts)]
#[instruction(todo_idx: u8)]
pub struct UpdateTodo<'info> {
    #[account(mut,has_one = authority,seeds = [TodoAccount::SEED_PREFIX,authority.key().as_ref(),&[todo_idx].as_ref()],bump)]
    pub todo_account: Account<'info, TodoAccount>,
    #[account(mut,has_one = authority,seeds = [UserAccount::SEED_PREFIX,authority.key().as_ref()],bump)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
