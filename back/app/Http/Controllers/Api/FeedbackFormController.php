<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FeedbackForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedbackFormController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $feedback = FeedbackForm::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Обращение успешно отправлено!',
            'data' => $feedback,
        ]);
    }
}
