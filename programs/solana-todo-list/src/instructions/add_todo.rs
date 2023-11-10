use anchor_lang::prelude::*;
use crate::states::todo::TodoAccount;
use crate::states::user::UserAccount;

pub fn add_todo(ctx: Context<AddTodo>, content: String) -> Result<()> {
    let todo_account = &mut ctx.accounts.todo_account;
    let user_account = &mut ctx.accounts.user_account;
    let authority = &ctx.accounts.authority;

    todo_account.authority = authority.key();
    todo_account.idx = user_account.last_todo;
    todo_account.content = content;
    todo_account.marked = false;

    user_account.last_todo = user_account.last_todo.checked_add(1).unwrap();
    user_account.todo_total = user_account.todo_total.checked_add(1).unwrap();

    Ok(())
}

#[derive(Accounts)]
#[instruction()]
pub struct AddTodo<'info> {
    #[account(init,payer=authority,space=TodoAccount::ACCOUNT_SPACE,seeds=[TodoAccount::SEED_PREFIX,authority.key().as_ref(),&[user_account.last_todo as u8].as_ref()],bump)]
    pub todo_account: Account<'info, TodoAccount>,
    #[account(mut,has_one=authority,seeds=[UserAccount::SEED_PREFIX,authority.key().as_ref()],bump)]
    pub user_account: Account<'info, UserAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}
