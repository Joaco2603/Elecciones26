'use client';

import { useChat } from 'ai/react';

export default function ChatPage() {
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();

    return (
        <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
            <h1 className="text-2xl font-bold mb-4 text-center">Consultor Electorale 2026</h1>

            <div className="space-y-4 mb-4">
                {messages.map(m => (
                    <div key={m.id} className="whitespace-pre-wrap">
                        <div className={`font-bold ${m.role === 'user' ? 'text-blue-500' : 'text-green-500'}`}>
                            {m.role === 'user' ? 'Tú: ' : 'Asistente: '}
                        </div>
                        <p>{m.content}</p>
                    </div>
                ))}
                {isLoading && <div className="text-gray-500 italic">Consultando normativa...</div>}
            </div>

            <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl bg-white dark:bg-zinc-900">
                <input
                    className="w-full p-2 border-none focus:ring-0 text-black dark:text-white bg-transparent"
                    value={input}
                    placeholder="Haz una pregunta sobre las elecciones..."
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}
