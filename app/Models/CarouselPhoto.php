<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class CarouselPhoto extends Model
{
    protected $primaryKey = 'carouselID';
    protected $table = 'carousel_photos';

    protected $fillable = [
        'photoLink', 'title', 'description', 'is_active'
    ];

    // Scope for active photos
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    // File handling methods
    public function updatePhoto($newPhoto)
    {
        // Remove old photo if exists
        if ($this->photoLink && Storage::exists($this->photoLink)) {
            Storage::delete($this->photoLink);
        }

        // Store new photo
        $newPhotoPath = $newPhoto->store('carousel', 'public');
        
        // Update model with new photo path
        $this->photoLink = $newPhotoPath;
        $this->save();

        return $newPhotoPath;
    }

    // Override delete method to remove associated file
    public function delete()
    {
        // Delete associated photo if exists
        if ($this->photoLink && Storage::exists($this->photoLink)) {
            Storage::delete($this->photoLink);
        }

        // Call parent delete method
        return parent::delete();
    }
}