<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\WhatsappController;
use App\Models\Customer;

class AnnouncementController extends Controller
{
    public function index(){
        $announcements = Announcement::all();
        return Inertia::render('Admin/Announcement', ['announcements' => $announcements]);
    }
    public function store(Request $request){
        $announcement = Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
        ]);
        $customers = Customer::all();
        $message = $announcement->title ."\n". $announcement->content;
        $whatsappController = new WhatsappController();

        foreach($customers as $customer){
            $response = $whatsappController->send($customer->whatsapp_number, $message);
        }

        return redirect()->back()->with('success', 'Pengumuman berhasil dibuat.');
    }
}
