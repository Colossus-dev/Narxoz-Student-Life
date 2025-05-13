<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedbackForm extends Model
{
    use HasFactory;
    protected $table = 'feedback_forms';

    protected $fillable = ['name', 'surname','phone','message'];
}
