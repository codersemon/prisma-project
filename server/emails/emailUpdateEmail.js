// dependencies
import { emailTransporter } from "../utils/emailTransporter.js";

export const sendEmailUpdateTokenEmail = async (email, otp, newEmail) => {
  await emailTransporter.sendMail({
    from: '"PrismaORM Commerce" <auradev615@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Email Change Notification", // Subject line
    html: `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">


    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link
        href="https://fonts.googleapis.com/css2?family=Public+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@200;300;400;600;700;800;900&display=swap"
        rel="stylesheet">

    <style type="text/css">
        body {
            text-align: center;
            margin: 0 auto;
            width: 650px;
            font-family: 'Public Sans', sans-serif;
            background-color: #e2e2e2;
            display: block;
        }

        .mb-3 {
            margin-bottom: 30px;
        }

        ul {
            margin: 0;
            padding: 0;
        }

        li {
            display: inline-block;
            text-decoration: unset;
        }

        a {
            text-decoration: none;
        }

        h5 {
            margin: 10px;
            color: #777;
        }

        .text-center {
            text-align: center
        }

        .header-menu ul li+li {
            margin-left: 20px;
        }

        .header-menu ul li a {
            font-size: 14px;
            color: #252525;
            font-weight: 500;
        }

        .password-button {
            background-color: #0DA487;
            border: none;
            color: #fff;
            padding: 14px 26px;
            font-size: 18px;
            border-radius: 6px;
            font-weight: 700;
            font-family: 'Nunito Sans', sans-serif;
        }

        .footer-table {
            position: relative;
        }

        .footer-table::before {
            position: absolute;
            content: "";
            background-image: url(https://themes.pixelstrap.com/fastkart/email-templete/images/footer-left.svg);
            background-position: top right;
            top: 0;
            left: -71%;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            z-index: -1;
            background-size: contain;
            opacity: 0.3;
        }

        .footer-table::after {
            position: absolute;
            content: "";
            background-image: url(https://themes.pixelstrap.com/fastkart/email-templete/images/footer-right.svg);
            background-position: top right;
            top: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            z-index: -1;
            background-size: contain;
            opacity: 0.3;
        }

        .theme-color {
            color: #0DA487;
        }
    </style>
</head>

<body style="margin: 20px auto;">
    <table align="center" border="0" cellpadding="0" cellspacing="0"
        style="background-color: white; width: 100%; box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);-webkit-box-shadow: 0px 0px 14px -4px rgba(0, 0, 0, 0.2705882353);">
        <tbody>
            <tr>
                <td>
                    <table class="header-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr class="header"
                            style="background-color: #f7f7f7;display: flex;align-items: center;justify-content: space-between;width: 100%;">
                            <td class="header-logo" style="padding: 10px 32px;">
                                <a href="${process.env.CLIENT_URL}" style="display: block; text-align: left;">
                                    <img src="https://themes.pixelstrap.com/fastkart/email-templete/images/logo.png" class="main-logo" alt="logo">
                                </a>
                            </td>
                            <td class="header-menu" style="display: block; padding: 10px 32px;text-align: right;">
                                <ul>
                                    <li>
                                        <a href=${process.env.CLIENT_URL}>Home</a>
                                    </li>
                                    <li>
                                        <a href="${process.env.CLIENT_URL}/wishlist">Wishlist</a>
                                    </li>
                                    <li>
                                        <a href="${process.env.CLIENT_URL}/cart">My Cart</a>
                                    </li>
                                    <li>
                                        <a href="${process.env.CLIENT_URL}/my-account">Account</a>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </table>

                    <table class="contant-table" style="margin-bottom: -6px;" align="center" border="0" cellpadding="0"
                        cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <td>
                                    <img style="width: 100%; display: block;" src="https://themes.pixelstrap.com/fastkart/email-templete/images/welcome-poster.jpg" alt="">
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <table class="contant-table" style="margin-top: 40px;" align="center" border="0" cellpadding="0"
                        cellspacing="0" width="100%">
                        <thead>
                            <tr style="display: block;">
                                <td style="display: block;">
                                    <h3
                                        style="font-weight: 700; font-size: 20px; margin: 0; text-transform: uppercase; text-align: center;">
                                        Hi, You have requested to update email</h3>
                                </td>

                                <td>
                                    <p
                                        style="font-size: 14px;font-weight: 600;width: 82%;margin: 8px auto 0;line-height: 1.5;color: #939393;font-family: 'Nunito Sans', sans-serif;">
                                        We hope our product will lead you, like many other before you. to a place where
                                        yourideas where your ideas can spark and grow.n a place where you’ll find all
                                        your inspiration needs. before we get started, we’ll need to verify your email.
                                    </p>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <table class="button-table" style="margin: 34px 0;" align="center" border="0" cellpadding="0"
                        cellspacing="0" width="100%">
                        <thead>
                        <tr style="display: block;">
                                <td style="display: block;">
                                    <p
                                        style="font-size: 14px;font-weight: 600; margin: 8px auto 0;line-height: 1.5;color: #939393;font-family: 'Nunito Sans', sans-serif; text-align: center;">You new email address is ${newEmail} if you want to update this, use the otp below
                                    </p>
                                </td>
                            </tr>
                            <tr style="display: block;">
                                <td style="display: block;">
                                <h3
                                        style="font-weight: 700; font-size: 20px; margin: 0; text-transform: uppercase; text-align: center;">
                                        Your OTP: ${otp}</h3>
                                </td>
                            </tr>
                            
                        </thead>
                    </table>

                    <table class="contant-table" align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                        <thead>
                            <tr style="display: block;">
                                <td style="display: block;">
                                    <p
                                        style="font-size: 14px; font-weight: 600; width: 82%; margin: 0 auto; line-height: 1.5; color: #939393; font-family: 'Nunito Sans', sans-serif;">
                                        If you have any question, please email us at <span
                                            class="theme-color">devswizard@gmail.com</span> or vixit our <span
                                            class="theme-color">FAQs.</span> You can also chat with a real live human
                                        during our operating hours. they can answer questions about account or help you
                                        with your meditation practice.</p>
                                </td>
                            </tr>
                        </thead>
                    </table>

                    <table class="text-center footer-table" align="center" border="0" cellpadding="0" cellspacing="0"
                        width="100%"
                        style="background-color: #282834; color: white; padding: 24px; overflow: hidden; z-index: 0; margin-top: 30px;">
                        <tr>
                            <td>
                                <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                    align="center" style="margin: 8px auto 11px;">
                                    <tr>
                                        <td>
                                            <h4 style="font-size: 19px; font-weight: 700; margin: 0; color: #fff;">Shop For <span
                                                    style="color: #0DA487;">Greenkart</span></h4>
                                        </td>
                                    </tr>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                    align="center" style="margin: 8px auto 20px;">
                                    <tr>
                                        <td>
                                            <a href="javascript:void(0)"
                                                style="font-size: 14px; font-weight: 600; color: #fff; text-decoration: underline; text-transform: capitalize;">Contact
                                                Us</a>
                                        </td>
                                        <td>
                                            <a href="javascript:void(0)"
                                                style="font-size: 14px; font-weight: 600; color: #fff; text-decoration: underline; text-transform: capitalize; margin-left: 20px;">unsubscribe</a>
                                        </td>
                                        <td>
                                            <a href="javascript:void(0)"
                                                style="font-size: 14px; font-weight: 600; color: #fff; text-decoration: underline; text-transform: capitalize; margin-left: 20px;">privacy
                                                Policy</a>
                                        </td>
                                    </tr>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" class="footer-social-icon text-center"
                                    align="center" style="margin: 23px auto;">
                                    <tr>
                                        <td>
                                            <a href="www.facebook.com">
                                                <img src="images/fb.png"
                                                    style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                    alt="">
                                            </a>
                                        </td>
                                        <td>
                                            <a href="www.twitter.com">
                                                <img src="images/twitter.png"
                                                    style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                    alt="">
                                            </a>
                                        </td>
                                        <td>
                                            <a href="www.instagram.com">
                                                <img src="images/insta.png"
                                                    style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                    alt="">
                                            </a>
                                        </td>
                                        <td>
                                            <a href="www.pinterest.com">
                                                <img src="images/pinterest.png"
                                                    style="font-size: 25px; margin: 0 18px 0 0;width: 22px;filter: invert(1);"
                                                    alt="">
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <tr>
                                        <td>
                                            <h5 style="font-size: 13px; text-transform: uppercase; margin: 0; color:#ddd;
                                letter-spacing:1px; font-weight: 500;">Want to change how you receive these emails?
                                            </h5>
                                            <h5 style="font-size: 13px; text-transform: uppercase; margin: 10px 0 0; color:#ddd;
                                letter-spacing:1px; font-weight: 500;">2024 copyright by Emon Khan</h5>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
    `
  });
};
