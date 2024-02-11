// User.tsx

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../../components/feedback/modal';
import Titre from '../../components/common/titre';
import Form from '../../components/common/form';
import { RootState } from '../../redux/store';
import { setUser } from '../../redux/slice/user.slice';
import { settingQuestions } from '../../data/setting.data';
import ApiUser from '../../api/user/user.api';

interface FormData {
    username: string;
    email: string;
    description: string;
    id?: number;
}

function Setting() {
    const user = useSelector(
        (state: RootState) => state.user.value
    ) as FormData | null;
    const dispatch = useDispatch();

    const initialFormData: FormData = {
        username: '',
        email: '',
        description: '',
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    useEffect(() => {
        if (user && typeof user === 'object') {
            setFormData(user as FormData);
        }
    }, [user]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if (user && user.id) {
        try {
            console.log('formData', formData);
            const userData = {
                email: formData.email,
                username: formData.username,
            };
            const response = await ApiUser.updateUser(userData);
            if (response && response.data) {
                console.log('response', response.data);
                dispatch(setUser(formData));
            }
        } catch (error) {
            console.error('Erreur lors de la mise à jour', error);
        }
        // }
    };

    return (
        <Modal>
            <div className="setting-container">
                <Titre title="Tes Paramètres" balise="h1" hasBorderBottom />
                <div className="setting-form">
                    <Form
                        dataQuestion={settingQuestions}
                        handleSubmit={handleSubmit}
                        dataArr={formData}
                        setDataArr={setFormData}
                        label="Mettre à jour"
                    />
                </div>
            </div>
        </Modal>
    );
}

export default Setting;
