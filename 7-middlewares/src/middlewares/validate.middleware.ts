
export const validateMiddleware = (req: any, res: any, next: () => void) => {
    console.log('Validate Middleware executed');
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: 'Bad Request: Body is required' });
    }
    next();
};