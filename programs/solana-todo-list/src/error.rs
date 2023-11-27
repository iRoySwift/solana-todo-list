use anchor_lang::prelude::*;

#[error_code]
pub enum TodoError {
    #[msg("You are not authoritied to perform this action.")]
    Unauthorized,
    #[msg("Not allowed")]
    NotAllow,
    #[msg("Math operation overflow")]
    MathOverflow,
    #[msg("Already Marked")]
    AlreadyMarked,
    #[msg("Already Marked can't update")]
    UpdateContentMarked,
}
