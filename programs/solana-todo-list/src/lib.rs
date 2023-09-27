use anchor_lang::prelude::*;

declare_id!("6jgtKSDrYm7eNRK9FWjLiY2CswUfFzAwj6nfddfKLA6B");

#[program]
pub mod solana_todo_list {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
