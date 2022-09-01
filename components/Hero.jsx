import css from '../styles/Hero.module.css';
import Image from 'next/image';
import Cherry from '../assets/Cherry.png';
import HeroImage from '../assets/HeroImage.png';
import {UilPhone} from '@iconscout/react-unicons';
import Pizza1 from '../assets/p1.jpg';

export default function Hero() {
    return (
        <div className={css.container}>
            {/* left Side */}
            <div className={css.leftSide}>
                <div className={css.cherryDiv}>
                    <span>More than Faster</span>
                    <Image src={Cherry} alt="" height={25} width={40} />
                </div>
                
                <div className={css.heroText}>
                    <span>Be The Fastest</span>
                    <span>In Delivering</span>
                    <span>Your <span style={{color: "var(--themeRed)"}}>Pizza</span></span>
                </div>

                <span className={css.miniText}>
                    Our mission is to filling your tummy with delicious food and with fast and free delivery
                </span>

                <button className={`btn ${css.btn}`}>
                    Get STarted
                </button>
            </div>
            {/* right Side */}
            <div className={css.rightSide}>
                
                <div className={css.imageContainer}>
                    <Image src={HeroImage} alt="" layout='intrinsic' />
                </div>

                <div className={css.ContactUs}>
                    <span>Contact Us</span>
                    <div>
                        <UilPhone color="white" />
                    </div>
                </div>

                <div className={css.Pizza}>
                    <div>
                        <Image src={Pizza1} alt="" objectFit='cover' layout='intrinsic' />
                    </div>
                    <div className={css.details}>
                        <span>Italian Pizza</span>
                        <span>
                            <span style={{color: "var(--themeRed)"}}>
                                <span>&#8377;</span>
                            </span> 290/-
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}