import React, {useState} from 'react';
import {Form, Input, Button, Rate, message} from 'antd';
import userService from '../../services/UserService';
import feedbackService from '../../services/FeedbackService';


const AddFeedbackForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (values) => {

        setLoading(true);

        const feedbackData = {
            feedback: values.feedback,
            numberOfStars: values.numberOfStars || 0,
            userId: userService.getId()
        };

        feedbackService.saveFeedback(feedbackData)
            .then(() => {
                setLoading(false);
                form.resetFields();
                message.success('Отзыв успешно сохранён')
            })
            .catch(e => message.error('Не удалось сохранить отзыв'))

    };

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="feedback" label="Фидбек" rules={[{required: true, message: 'Введите отзыв!'}]}>
                <Input.TextArea rows={4}/>
            </Form.Item>
            <Form.Item name="numberOfStars" label="Рейтинг"
                       rules={[{required: true, message: 'Введите количество звёзд!'}]}>
                <Rate allowHalf={false}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Добавить отзыв
                </Button>
            </Form.Item>
        </Form>
    );
};

export default AddFeedbackForm;