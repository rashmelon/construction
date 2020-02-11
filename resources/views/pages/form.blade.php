@extends('layouts.website')

@section('content')
    <div class="container">
        <form id="contact" action="/submit" method="post">
            {{ csrf_field() }}
            <h3>Construction Contact Form</h3>
            <h4>Contact us</h4>
            <fieldset>
                <input placeholder="Your name" type="text" tabindex="1" name="name" required autofocus>
            </fieldset>
            <fieldset>
                <input placeholder="Your Email Address" type="email" tabindex="2" name="email" required>
            </fieldset>
            <fieldset>
                <input placeholder="Your Phone Number (optional)" type="tel" tabindex="3" name="phone" required>
            </fieldset>
            <fieldset>
                <button name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
            </fieldset>
        </form>
    </div>
@endsection


