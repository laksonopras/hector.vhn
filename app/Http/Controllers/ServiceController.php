<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Shoes;
use App\Models\Status;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Service $service)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Service $service)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateStatus($id)
    {
        $service = Service::find($id);
        if($service->status == 2 || $service->status == 3){
            $service->update([
                'status' => $service->status + 1,
                'operator' => Auth::user()->id
            ]);
            $shoes = Shoes::with('order')->find($service->shoes_id);
            if($service->status == 3){
                if($shoes->status == 2){
                    $shoes->update(['status' => 3]);
                    if($shoes->order->order_status == 5){
                        $shoes->order->update(['order_status' => 6]);
                        $status = new StatusController();
                        $status->store($shoes->order->id, 6, Auth::user()->id);
                    }
                }
            }
            if($service->status == 4){
                $sum_service = Service::where('shoes_id', $service->shoes->id)->where('status', '!=', 4)->count();
                if($sum_service == 0) {
                    $shoes->update(['status' => 4]);
                    $sum_shoes = Shoes::where('order_id', $shoes->order->id)->where('status', '!=', 4)->count();
                    if($sum_shoes == 0){
                        $shoes->order->update(['order_status' => 7]);
                        $status = new StatusController();
                        $status->store($shoes->order->id, 7, Auth::user()->id);
                    }
                }
            }

            return back()->with('success', 'Status berhasil diubah');
        } else {
            
            return back()->with('success', 'Status tidak dapat diubah');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Service $service)
    {
        //
    }
}
