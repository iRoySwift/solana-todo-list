use anchor_lang::prelude::*;

use crate::error::TodoError;
use crate::states::todo::TodoAccount;
use crate::states::user::UserAccount;

pub fn mark_todo(ctx: Context<MarkTodo>, _todo_idx: u8) -> Result<()> {
    let todo_account = &mut ctx.accounts.todo_account;
    require!(!todo_account.marked, TodoError::AlreadyMarked);
    todo_account.marked = !todo_account.marked;
    Ok(())
}

#[derive(Accounts)]
#[instruction(todo_idx:u8)]
pub struct MarkTodo<'info> {
    #[account(mut,has_one=authority,seeds=[TodoAccount::SEED_PREFIX,authority.key().as_ref(),&[todo_idx].as_ref()],bump)]
    pub todo_account: Account<'info, TodoAccount>,
    #[account(mut,has_one=authority,seeds=[UserAccount::SEED_PREFIX,authority.key().as_ref()],bump)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
