<?php
// Please use this sparingly. Always handle toast at front end whenever possible
namespace App\Helpers;

class Toast
{

    public static function success(string $message)
    {
        session()->flash('toast', [
            'type' => 'success',
            'message' => $message,
        ]);
    }
    public static function error(string $message)
    {
        session()->flash('toast', [
            'type' => 'error',
            'message' => $message,
        ]);
    }
    public static function info(string $message)
    {
        session()->flash('toast', [
            'type' => 'info',
            'message' => $message,
        ]);
    }
    public static function warning(string $message)
    {
        session()->flash('toast', [
            'type' => 'warning',
            'message' => $message,
        ]);
    }
    public static function default(string $message)
    {
        session()->flash('toast', [
            'type' => 'default',
            'message' => $message,
        ]);
    }
}
