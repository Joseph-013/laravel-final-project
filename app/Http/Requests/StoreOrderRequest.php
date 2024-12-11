<?php

namespace App\Http\Requests;

use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_id' => 'required|exists:products,id',
            'specifications' => 'required|string|max:65535',
            'files' => 'required|array',
            'files.*' => 'required|file|max:10240',
            'quantity' => 'required|integer|min:1|max:65535',
            'order_deadline_date' => 'nullable|date|after_or_equal:today',
            'order_deadline_time' => 'required|date_format:H:i',
            'address' => 'required|string|max:65535',
            'pickup_type' => 'required|in:Pickup,Delivery',
        ];
    }
}
