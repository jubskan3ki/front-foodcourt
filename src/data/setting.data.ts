import { Question } from '../interface/other/question.interface';

export const settingQuestions: Question[] = [
    {
        id: 'username',
        label: 'Nom d’utilisateur',
        name: 'username',
        type: 'text',
        placeholder: 'Entrez votre nom d’utilisateur',
        required: true,
    },
    {
        id: 'email',
        label: 'Email',
        name: 'email',
        type: 'email',
        placeholder: 'Entrez votre email',
        required: true,
    },
];
