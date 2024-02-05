//! Program error

use num_derive::FromPrimitive;
use num_traits::FromPrimitive;
use solana_program::{
    decode_error::DecodeError,
    msg,
    program_error::{PrintProgramError, ProgramError},
};
use thiserror::Error;

#[derive(Debug, Error, FromPrimitive)]
pub enum TodoError {
    // pad account does not have the correct program id
    /// Not owner by Todo program
    #[error("Not owner by Todo program")]
    NotOwnedByAccount,
}

impl From<TodoError> for ProgramError {
    fn from(e: TodoError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

impl<E> DecodeError<E> for TodoError {
    fn type_of() -> &'static str {
        "TodoError"
    }
}

impl PrintProgramError for TodoError {
    fn print<E>(&self)
    where
        E: 'static + std::error::Error + DecodeError<E> + PrintProgramError + FromPrimitive,
    {
        match self {
            Self::NotOwnedByAccount => {
                msg!("Error: Account Not owner by Todo program")
            }
        }
    }
}
