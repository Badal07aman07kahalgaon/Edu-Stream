<?php

namespace App\Http\Controllers;

use App\Models\ChatMessage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    public function getMessages(Request $request)
    {
        $messages = ChatMessage::with('user')
            ->orderBy('created_at', 'asc')
            ->get();

        return response()->json([
            'messages' => $messages
        ]);
    }

    public function sendMessage(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $message = ChatMessage::create([
            'user_id' => Auth::id(),
            'message' => $request->message,
        ]);

        $message->load('user');

        // Broadcast the message for real-time updates
        broadcast(new \App\Events\MessageSent($message))->toOthers();

        return response()->json([
            'message' => $message,
            'status' => 'Message sent successfully'
        ], 201);
    }
}
