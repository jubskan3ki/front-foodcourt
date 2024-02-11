import Cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
import {
    EventSourceMessage,
    fetchEventSource,
} from '@microsoft/fetch-event-source';

export default function useMercureHub(): void {
    const mercureToken = Cookies.get('mercureToken');
    const topics = Cookies.get('topics');

    // const dispatch = useDispatch();

    // const handleChannelMessage = useCallback(
    //     (data: IMessage): void => {
    //         dispatch({
    //             type: 'channels/addMessage',
    //             payload: {
    //                 id: data.channel?.id as number,
    //                 message: data,
    //             },
    //         });
    //     },
    //     [dispatch]
    // );

    // const handleConversationCreated = useCallback(
    //     (conversation: IConversation) => {
    //         dispatch({
    //             type: 'conversations/addConversation',
    //             payload: { conversation },
    //         });

    //         dispatch({
    //             type: 'mercure/addTopic',
    //             payload: {
    //                 topic: `/conversations/${conversation.id}`,
    //             },
    //         });
    //     },
    //     [dispatch]
    // );

    // const handleConversationMessage = useCallback(
    //     (message: IMessage): void => {
    //         dispatch({
    //             type: 'conversations/addMessage',
    //             payload: {
    //                 id: message.conversation_id as number,
    //                 message,
    //             },
    //         });
    //     },
    //     [dispatch]
    // );

    // const handleUserContactCreated = useCallback(
    //     (contact: IUser): void => {
    //         dispatch({
    //             type: 'contacts/addContact',
    //             payload: { contact },
    //         });
    //     },
    //     [dispatch]
    // );

    // const handleUserContactDeleted = useCallback(
    //     (contact: IUser) => {
    //         dispatch({
    //             type: 'contacts/removeContact',
    //             payload: { id: contact.id },
    //         });

    //         for (const conversation of contact.conversations) {
    //             dispatch({
    //                 type: 'conversations/removeConversation',
    //                 payload: { id: conversation.id },
    //             });

    //             dispatch({
    //                 type: 'mercure/removeTopic',
    //                 payload: {
    //                     topic: `/conversations/${conversation.id}`,
    //                 },
    //             });
    //         }
    //     },
    //     [dispatch]
    // );

    const handleMessage = useCallback((event: EventSourceMessage): void => {
        const data = JSON.parse(event.data);

        console.log('[useMercureHub] New data received : ', data);
    }, []);

    /*     const handleMessage = useCallback(
        (event: EventSourceMessage): void => {
            const data = JSON.parse(event.data);
            const action = data.action;
            const type = data.type;
            const resource = JSON.parse(data.resource);

            if (resource) {
                console.log('[useMercureHub] New message received', resource); // supprimé


                switch (type) {
                    case 'channels':
                        if (action === 'channel.message.created')
                            handleChannelMessage(resource);
                        break;
                    case 'conversations':
                        if (action === 'conversation.message.created')
                            handleConversationMessage(resource);

                        if (action === 'user.conversation.created')
                            handleConversationCreated(resource);
                        break;
                    case 'contacts':
                        if (action === 'user.contact.created')
                            handleUserContactCreated(resource);

                        if (action === 'user.contact.deleted')
                            handleUserContactDeleted(resource);
                        break;
                }
            }
        },
        [
            handleConversationCreated,
            handleChannelMessage,
            handleConversationMessage,
            handleUserContactCreated,
            handleUserContactDeleted,
        ]
    ); */

    const logMessageOnOpen = (res: Response): void => {
        if (res.ok && res.status === 200) {
            console.log('[useMercureHub] Connection established');
        } else if (
            res.status >= 400 &&
            res.status < 500 &&
            res.status !== 429
        ) {
            console.log('[useMercureHub] Client side error ', res);
        } else {
            console.log('[useMercureHub] Server side error ', res);
        }
    };

    const connectToMercureHub = useCallback(
        async (controller: AbortController, url: URL): Promise<void> => {
            const { signal } = controller;

            await fetchEventSource(url.toString(), {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${mercureToken}`,
                },
                signal,
                onclose: () => {
                    console.log(
                        '[useMercureHub] Connection closed by the server'
                    );
                },
                onerror: (err) => {
                    console.log(
                        '[useMercureHub] There was an error from server',
                        err
                    );
                },
                onmessage: (event: EventSourceMessage) => {
                    handleMessage(event);
                },
                onopen: (res: Response) =>
                    new Promise<void>((resolve) => {
                        logMessageOnOpen(res);

                        resolve();
                    }),
            });
        },
        [mercureToken, handleMessage]
    );

    useEffect(() => {
        console.log('[useMercureHub] UseEffect');

        if (!mercureToken) {
            console.log('[useMercureHub] No token');
            return;
        }

        if (!topics || topics.length === 0) {
            console.log('[useMercureHub] No topics');
            return;
        }

        const controller = new AbortController();

        const url = new URL('http://localhost:1234/.well-known/mercure');

        for (const topic of topics) {
            url.searchParams.append('topic', topic);
        }

        connectToMercureHub(controller, url);

        // eslint-disable-next-line consistent-return
        return () => {
            console.log('[useMercureHub] Closing connection');
            controller.abort();
        };
    }, [connectToMercureHub, topics, mercureToken]);
}
