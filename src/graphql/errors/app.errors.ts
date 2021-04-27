import { ApolloError } from 'apollo-server'

const ErrorType = {
  AuthenticationRequired: 'AUTHENTICATION_REQUIRED',
}

export const buildAuthError = (): ApolloError =>
  new ApolloError('You must be signed in to do that', ErrorType.AuthenticationRequired)

export const buildCustomError = (message: string): ApolloError => 
  new ApolloError(message)

export const buildFileUploadError = (): ApolloError =>
  new ApolloError('Error while uploading file')
