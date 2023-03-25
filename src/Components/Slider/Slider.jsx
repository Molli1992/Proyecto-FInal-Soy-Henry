import React from 'react';
import './Slider.css';
import { Carousel } from 'antd';
import assa from '../Assets/assassins_creed.webp';
import elden from '../Assets/elden_ring.webp';
import fallen from '../Assets/fallen_order.webp';
import howarts from '../Assets/howarts_legacy.webp';

function Slider() {

  const sliderCards = [
    {
      background: assa,
      title: "Assassin's Creed Infinity",
      subtitle: 'Disponible',
      description: 'Conviértete en Eivor, un poderoso saqueador vikingo y lidera a tu clan desde las inclementes costas de Noruega a un nuevo hogar en medio de las exuberantes tierras de cultivo de la Inglaterra del siglo IX',
      price: '$USD 49.00',
    },
    {
      background: elden,
      title: "Elden Ring",
      subtitle: 'Disponible',
      description: 'Levántate, tiznado, y déjate guiar por la gracia para esgrimir el poder del Anillo de Elden y convertirte en un Señor de Elden en las Tierras Intermedias',
      price: '$USD 69.00',
    },
    {
      background: fallen,
      title: "Star Wars Jedi: Fallen Order",
      subtitle: 'Disponible',
      description: 'Eres uno de los últimos Jedi, y deberás sobrevivir a toda costa. Completa tu entrenamiento antes de que los inquisidores descubran tu plan de reconstruir la Orden Jedi',
      price: '$USD 29.00',
    },
    {
      background: howarts,
      title: "Hogwarts Legacy",
      subtitle: 'Disponible',
      description: 'Ahora puedes tomar el control de la acción y ser el centro de tu propia aventura en el mundo mágico. El legado está en tus manos!',
      price: '$USD 69.00',
    },
  ]

  return (
    <Carousel autoplay>
      {sliderCards.map((el,i) => (
        <React.Fragment key={i}>
          <div>
            <div className='slider-card-component' style={{background: `url('${el.background}')`}}>
              <div className='slider-card-component-container'>
                <div className='info'>
                  <h2 className='title'>{el.title}</h2>
                  <p className='subtitle'>{el.subtitle}</p>
                  <p className='description'>{el.description}</p>
                  <p className='price'>{el.price}</p>
                  <button>Comprar</button>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </Carousel>
  )
}

export { Slider }