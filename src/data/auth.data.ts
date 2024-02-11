import { Question } from '../interface/other/question.interface';

export const loginFormQuestions: Question[] = [
    {
        id: 'email',
        label: 'Adresse e-mail',
        name: 'email',
        type: 'text',
        placeholder: 'Entrez votre adresse e-mail',
        required: true,
    },
    {
        id: 'password',
        label: 'Mot de passe',
        name: 'password',
        type: 'password',
        placeholder: 'Entrez votre mot de passe',
        required: true,
    },
];

export const registrationFormQuestions: Question[] = [
    {
        id: 'username',
        label: "Nom d'utilisateur",
        name: 'username',
        type: 'text',
        placeholder: "Entrez votre nom d'utilisateur",
        required: true,
    },
    {
        id: 'email',
        label: 'Adresse e-mail',
        name: 'email',
        type: 'text',
        placeholder: 'Entrez votre adresse e-mail',
        required: true,
    },
    {
        id: 'password',
        label: 'Mot de passe',
        name: 'password',
        type: 'password',
        placeholder: 'Entrez votre mot de passe',
        required: true,
    },
    {
        id: 'confirmPassword',
        label: 'Confirmez votre mot de passe',
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirmez votre mot de passe',
        required: true,
    },
];
