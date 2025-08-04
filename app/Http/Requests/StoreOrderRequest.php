<?php

namespace App\Http\Requests;

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
            'customer_name' => 'required|string|max:255',
            'destination' => 'required|string|max:255',
            'reason' => 'required|string',
            'order_time' => 'required|date|after:now',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'customer_name.required' => 'Customer name is required.',
            'destination.required' => 'Destination is required.',
            'reason.required' => 'Reason for the order is required.',
            'order_time.required' => 'Order time is required.',
            'order_time.after' => 'Order time must be in the future.',
        ];
    }
}