export enum Exceptions {
	invalidConstructorArgs = 'Wrong constructor arguments|Should be <string>validApppath or <object>{appPath: validApppath}',
	invalidAppSetting = 'Valid appPath argument not provided',
	invalidAppPath = 'The value you provided in the parameter: appPath does not lead to a valid folder path',
	invalidConfigPath = 'Missing config folder on appPath/../config',
	appPathInterpolation = 'Failing path: ":path"',
}
