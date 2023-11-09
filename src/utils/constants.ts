export const epiLogMessage = `For more information, 
  visit: https://boykaframework.github.io/boyka-framework`;
export const failureMessage = (command: string = ''): string => {
  const targetCommand = command.length === 0 ? '' : ` in ${command}`;
  return `whoops, something went wrong${targetCommand}! Run the command with '--help' option`;
};