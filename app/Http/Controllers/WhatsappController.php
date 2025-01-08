<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WhatsappController extends Controller
{

    public function send($receiver, $message){
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://api.fonnte.com/send',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
                CURLOPT_POSTFIELDS => array(
                'target' => "62" . $receiver,
                'message' => $message,
                'countryCode' => '62', //optional
            ),
            CURLOPT_HTTPHEADER => array(
                'Authorization: fshgEJXAubSBCZ3Kmaa9' 
            ),
        ));

        $response = curl_exec($curl);
        if (curl_errno($curl)) {
            $error_msg = curl_error($curl);
        }
        curl_close($curl);

        if (isset($error_msg)) {
            return response()->json($error_msg);
        } else {
            return response()->json($response);
        }
        
    }
}
