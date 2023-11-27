use anchor_lang::prelude::*;

use crate::states::todo::TodoAccount;
use crate::states::user::UserAccount;

pub fn remove_todo(ctx: Context<RemoveTodo>, _todo_idx: u8) -> Result<()> {
    //Decrement todo total count
    let user_account = &mut ctx.accounts.user_account;
    user_account.todo_total = user_account.todo_total.checked_sub(1).unwrap();

    // No Need to decrease last todo idx
    // Todo PDA already closed in Context
    Ok(())
}

#[derive(Accounts)]
#[instruction(todo_idx:u8)]
pub struct RemoveTodo<'info> {
    #[account(mut,close=authority,has_one=authority,seeds=[TodoAccount::SEED_PREFIX,authority.key().as_ref(),&[todo_idx].as_ref()],bump)]
    pub todo_account: Account<'info, TodoAccount>,
    #[account(mut,has_one=authority,seeds=[UserAccount::SEED_PREFIX,authority.key().as_ref()],bump)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
