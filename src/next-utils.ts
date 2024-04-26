import next from 'next';

const port = Number(process.env.PORT) || 3000;

export const nextApp = next({
	port,
	dev: process.env.NODE_ENV !== 'production',
});

export const nextHandler = nextApp.getRequestHandler();
