import { GiSofa, GiTable } from 'react-icons/gi'
import { BiChair, BiBed, BiCabinet } from 'react-icons/bi'

export const data = [
  {
    name: 'sofas',
    icon: <GiSofa />,
    subtype: ['Sofa Set', '1 Seater Sofa', '2 Seater Sofa', '3 Seater Sofa'],
  },
  {
    name: 'chairs',
    icon: <BiChair />,
    subtype: [
      'Executive Chairs',
      'Iconic Chairs',
      'Dining Chairs',
      'Folding Chairs',
      'Plastic Chairs',
      'Wing Chairs',
      'Rocking Chairs',
    ],
  },
  {
    name: 'dining',
    icon: <GiTable />,
    subtype: ['Dining Sets', 'Dining Tables', 'Dining Chairs'],
  },
  {
    name: 'beds',
    icon: <BiBed />,
    subtype: [
      'King Size Beds',
      'Queen Size Beds',
      'Single Beds',
      'Sofa Cum Beds',
    ],
  },
  {
    name: 'storage',
    icon: <BiCabinet />,
    subtype: ['Wardrobes', 'Cabinates'],
  },
]
