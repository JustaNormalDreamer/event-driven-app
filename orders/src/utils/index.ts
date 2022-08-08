export const generateRandomNumber = (): number => {
    return Math.floor(Math.random() * 100);
}

const words: string[] = [
    'Hello',
    'World',
    'Welcome',
    'To',
    'The',
    'World',
    'Of',
    'Typescript',    
    'Node',
    'Express',
    'RabbitMQ',    
    'Docker',    
    'Kubernetes',    
    'GCP',    
    'AWS',    
    'Git',    
    'Github',    
    'Gitlab',    
    'Gitlab',
    'Test',
    'Wordpress',
    'Laptop',
    'Ram'
];

export const generateRandomPhrase = (): string => {
    return words[Math.floor(Math.random() * words.length)];
}