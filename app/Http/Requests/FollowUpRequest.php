<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FollowUpRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'date' => '',
            'time' => '',
            'status' => '',
            'notes' => '',
            'call_status' => '',
            'important' => '',
            'customer_id' => 'exists:customers,id',
        ];
    }
}
