<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Notifications;

class NotificationController extends Controller
{
    public function NotificationHistory()
    {
        $result = Notifications::get();
        return $result;
    }
}
