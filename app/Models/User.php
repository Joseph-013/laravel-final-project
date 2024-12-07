<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'username';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'username', 
        'email', 
        'firstname', 
        'lastname', 
        'middlename', 
        'address', 
        'password'
    ];

    protected $hidden = [
        'password', 
        'remember_token',
    ];

    // Relationships
    public function orders()
    {
        return $this->hasMany(Order::class, 'username', 'username');
    }

    public function cart()
    {
        return $this->hasMany(Cart::class, 'username', 'username');
    }

    // Optional: Custom method to get full name
    public function getFullNameAttribute()
    {
        return trim("{$this->firstname} {$this->middlename} {$this->lastname}");
    }

    // Optional: Mutator for password (optional, Laravel hashes by default)
    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = bcrypt($value);
    }
}