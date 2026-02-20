export interface ProductDetailSection {
  title: string;
  description?: string;
  items: ProductDetailItem[];
  borderColor?: string;
}

export interface ProductDetailItem {
  name: string;
  description: string;
  specs?: { [key: string]: string };
}

export interface ApplicationProductDetails {
  intro?: string;
  sections: ProductDetailSection[];
}

export const applications = [
  {
    id: 1,
    slug: 'powder-metallurgy',
    title: 'Powder Metallurgy',
    image: '/images/application/powder-metallurgy.png',
      shortDescription: 'Ferrous and Non-Ferrous powders for powder metallurgy applications are manufactured in P.P.Patel Group with controlled chemistry, optimized particle size distribution, and consistent physical properties to ensure reliable compaction and sintering performance.',
      fullDescription: `Ferrous and Non-Ferrous powders for powder metallurgy applications are manufactured in P.P.Patel Group with controlled chemistry, optimized particle size distribution, and consistent physical properties to ensure reliable compaction and sintering performance. These powders are designed to deliver excellent flowability, high compressibility, and uniform densification, making them suitable for a wide range of PM components.

The powders provide good green strength after compaction and stable dimensional control during sintering. Their uniform particle morphology supports efficient alloying, infiltration, and blending operations, enabling enhanced mechanical, thermal, and electrical properties in finished components.

These PM-grade powders are compatible with conventional pressing, sintering, and copper infiltration processes and are suitable for producing structural, functional, and near-net-shape parts with high density and consistent quality.`,
    features: [
      'Controlled chemical composition and purity',
      'Optimized particle size and shape for PM processing',
      'Good flowability and compressibility',
      'High green strength and uniform sintering behavior',
      'Suitable for blending, alloying, and infiltration',
    ],
      products: ['Plain Iron Powders', 'Pre-Alloyed Powders', 'Diffusion Bonded Powders', 'Premixes'],
    productDetails: {
        intro: `Iron based powders
Iron and Iron based alloy Powders

Water atomised iron powder with irregular particle morphology offering excellent compressibility, high green strength, and reliable sintering performance for powder metallurgy applications.`,
        sections: [
          {
            title: 'Plain Iron Powders',
            description:
              'Water atomised iron powder with irregular particle morphology offering excellent compressibility, high green strength, and reliable sintering performance for powder metallurgy applications.',
            items: [
              {
                name: 'PHC 100.29',
                description:
                  'High compressible water atomized iron powder for medium and high density parts upto 7.00 gm/cc',
              },
              {
                name: 'PSC 100.29',
                description:
                  'High compressible water atomized iron powder ideal for high density parts upto 7.20 gm /cc and multi level structural components where strength with good dimensional stability is required',
              },
              {
                name: 'PBC 100.30',
                description:
                  'Water atomized iron powder with extra high compressibility used for very high density parts above 7.20 gm/cc. Due to its very low impurity levels this powder can be used for soft magnetic PM applications.',
              },
              {
                name: 'PHC 100.26',
                description:
                  'It is a high green strength water atomized iron powder for low and medium density parts.',
              },
              {
                name: 'PSC 100.25',
                description:
                  'It is a high green strength water atomized iron powder for low and medium density parts.',
              },
            ],
            borderColor: 'border-[#937e4f]',
          },
          {
            title: 'Pre-Alloyed Powders',
            items: [
              {
                name: 'PSC FeCu20',
                description:
                  '80% Iron and 20% pre-alloyed copper with very high strength used for minimizing the risk of copper segregation and achieve high dimensional stability.',
              },
              {
                name: 'PSC 0.50Mo',
                description:
                  'High compressible pre-alloyed steel powder with 0.50% Mo for high strength and high performance applications and it has wide range of hybrid alloy applications',
              },
            ],
            borderColor: 'border-[#937e4f]',
          },
          {
            title: 'Diffusion Bonded Powders',
            items: [
              {
                name: 'PSC DAB',
                description:
                  'Diffusion bonded powder (Iron- Bal, Cu-1.50%,Ni-1.75%,Mo-0.50%) with high compressibility, high strength, high toughness and good dimensional consistency used for producing structural parts through PM route.',
              },
              {
                name: 'PSC DAE',
                description:
                  'Diffusion bonded powder (Iron- Bal, Cu-1.50%,Ni-4%,Mo-0.50%) with high compressibility, high strength, high toughness and good dimensional consistency used for producing structural parts through PM route.',
              },
            ],
            borderColor: 'border-[#937e4f]',
          },
          {
            title: 'Copper Powder',
            items: [
              {
                name: 'Copper Powder 100 Mesh',
                description:
                  'High-purity medium-fine copper metal powder with good conductivity and compressibility, suitable for powder metallurgy components',
              },
              {
                name: 'Copper Powder 200 Mesh',
                description:
                  'High-purity medium-fine copper metal powder with good conductivity and compressibility, suitable for powder metallurgy components',
              },
            ],
            borderColor: 'border-cyan-400',
          },
          {
            title: 'Tin Powder',
            items: [
              {
                name: 'Tin Powder  200 Mesh',
                description: `High-purity fine tin metal powder with uniform particle size, excellent lubricity and solderability`,
              },
            ],
            borderColor: 'border-amber-400',
          },
          {
            title: 'Bronze Powder',
            items: [
              {
                name: 'Bronze Powder PB10',
                description: `Bronze Powder PB10 is manufactured with a controlled composition of 92% Copper (Cu) and 8% Tin (Sn).`,
              },
              {
                name: 'Bronze Powder PB9',
                description: `PB9 Bronze Powder is manufactured with a controlled composition of 91% Copper (Cu) and 9% Tin (Sn).`,
              },
              {
                name: 'Bronze Powder PB7',
                description: `Bronze Powder PB7 is manufactured in controlled chemical composition of 90% Copper (Cu) and 10% Tin (Sn).`,
              },
            ],
            borderColor: 'border-orange-400',
          },
        ],
      },
  },
  {
    id: 2,
    slug: 'welding',
    title: 'Welding',
    image: '/images/application/welding.png',
    shortDescription:
      'P P Patel Metal Powders offers high-purity welding grade iron powder specially manufactured for use in welding electrodes, flux formulations, and hardfacing applications.',
    fullDescription: `P P Patel Metal Powders offers high-purity welding grade iron powder specially manufactured for use in welding electrodes, flux formulations, and hardfacing applications. Our iron powder is engineered to deliver stable arc performance, improved deposition efficiency, and consistent weld quality.

Produced under strict quality control, the powder features uniform particle size distribution, controlled chemistry, and excellent flowability, making it ideal for electrode coating and welding consumables.

Key Features:
• High iron content with controlled impurities
• Very fine and consistent particle size
• Excellent flowability for uniform electrode coating
• Enhances deposition rate and weld metal recovery
• Supports stable arc and smooth weld bead formation

Plain Iron Powders

PHC 60.29
High purity atomised iron powder with 60 mesh and 2.90 apparent density mostly used in welding application. 

PHC 40.29
High purity atomised iron powder with 40 mesh and 2.90 apparent density mostly used in welding application.

PHC 40.37
High purity atomised iron powder with 40 mesh and 3.70 apparent density mostly used in welding application. 

Typical Applications:
• Welding electrode coatings
• Flux-cored wire formulations
• Hardfacing and build-up electrodes
• Special welding and repair applications

Quality Assurance:
Each batch is tested for chemical composition, particle size distribution, and physical properties to ensure reliable performance and batch-to-batch consistency.
Custom grades and particle size ranges available on request.`,
    features: [
      'High iron content with controlled impurities',
      'Very fine and consistent particle size',
      'Excellent flowability for uniform electrode coating',
      'Enhances deposition rate and weld metal recovery',
      'Supports stable arc and smooth weld bead formation',
    ],
    products: ['Plain Iron Powders'],
    productDetails: {
      intro:
        'P P Patel Metal Powders offers high-purity welding grade iron powder specially manufactured for use in welding electrodes, flux formulations, and hardfacing applications. Our iron powder is engineered to deliver stable arc performance, improved deposition efficiency, and consistent weld quality.',
      sections: [
        {
          title: 'Plain Iron Powders',
          description: 'High purity atomised iron powders optimized for welding applications',
          items: [
            {
              name: 'PHC 60.29',
              description:
                'High purity atomised iron powder with 60 mesh and 2.90 apparent density mostly used in welding application.',
            },
            {
              name: 'PHC 40.29',
              description:
                'High purity atomised iron powder with 40 mesh and 2.90 apparent density mostly used in welding application.',
            },
            {
              name: 'PHC 40.37',
              description:
                'High purity atomised iron powder with 40 mesh and 3.70 apparent density mostly used in welding application.',
            },
          ],
          borderColor: 'border-[#937e4f]'
        }
      ]
    }
  },
  {
    id: 3,
    slug: 'friction',
    title: 'Friction',
    image: '/images/application/friction.png',
    shortDescription:
      'P P Patel Metal Powders manufactures friction grade iron powder engineered for use in automotive and industrial friction materials such as brake pads, clutch linings, and friction plates.',
    fullDescription: `P P Patel Metal Powders manufactures friction grade iron powder engineered for use in automotive and industrial friction materials such as brake pads, clutch linings, and friction plates. The powder is designed to deliver stable friction performance, controlled wear, and thermal stability under demanding operating conditions.

Our friction grade iron powder features optimized particle size distribution and controlled morphology, ensuring uniform dispersion in friction formulations and consistent performance throughout the service life of the component.

Key Characteristics:
• High purity iron with controlled chemical composition
• Optimized particle size for friction formulations
• Consistent friction coefficient and wear behavior
• Excellent thermal resistance and heat dissipation
• Uniform mixing and processing characteristics

Typical Applications:
• Brake pads and brake shoes
• Clutch linings and clutch plates
• Automotive and industrial friction materials
• Sintered and resin-bonded friction components

Quality & Customization:
Each batch is produced under strict quality control and tested for particle size distribution, apparent density, flow properties, and chemical composition. Custom grades can be supplied based on specific friction performance and processing requirements.
Custom particle sizes and grades available on request.`,
    features: [
      'High purity iron with controlled chemical composition',
      'Optimized particle size for friction formulations',
      'Consistent friction coefficient and wear behavior',
      'Excellent thermal resistance and heat dissipation',
      'Uniform mixing and processing characteristics'
    ],
    products: ['Plain Iron Powders'],
    productDetails: {
      intro:
        'P P Patel Metal Powders manufactures friction grade iron powder engineered for use in automotive and industrial friction materials such as brake pads, clutch linings, and friction plates.',
      sections: [
        {
          title: 'Plain Iron Powders',
          description: 'High green strength water atomized iron powders for friction applications',
          items: [
            {
              name: 'PHC 100.26',
              description:
                'It is a high green strength water atomized iron powder for low and medium density parts.',
            },
            {
              name: 'PSC 100.25',
              description:
                'It is a high green strength water atomized iron powder for low and medium density parts.',
            },
          ],
          borderColor: 'border-[#937e4f]'
        }
      ]
    }
  },
  {
    id: 4,
    slug: 'aluminium-alloying',
    title: 'Aluminium Alloying',
    image: '/images/application/aluminium-alloying.png',
    shortDescription: 'High-purity iron powders for precise aluminium alloy additions and improved casting performance.',
    fullDescription: `P P Patel Metal Powders offers high-purity iron powder specially processed for use in aluminium alloying applications. Our iron powder enables precise iron addition and uniform alloy chemistry, helping aluminium producers achieve consistent mechanical properties and improved performance.

The controlled particle size and clean chemistry of our iron powder ensure efficient dissolution and uniform distribution in aluminium melts, minimizing segregation and defects during casting.

Key Benefits:
• High purity iron with controlled impurities
• Uniform and fine particle size for effective alloying
• Ensures accurate iron content in aluminium alloys
• Improves strength, wear resistance, and thermal stability
• Consistent performance in foundry and PM applications

Typical Applications:
• Aluminium alloying in foundries
• Automotive and engineering aluminium castings
• Die casting and gravity casting alloys
• Specialty aluminium alloy formulations

Quality & Customization:
Each batch is tested for chemical composition, particle size distribution, and physical properties to ensure repeatable results. Custom grades and particle sizes are available based on melting practice and alloy requirements. Custom mesh sizes and iron content control available on request.`,
    features: [
      'High purity iron with controlled impurities',
      'Uniform and fine particle size for effective alloying',
      'Ensures accurate iron content in aluminium alloys',
      'Improves strength, wear resistance, and thermal stability',
      'Consistent performance in foundry and PM applications'
    ],
    products: ['PHC 40.29'],
    productDetails: {
      intro: 'P P Patel Metal Powders offers high-purity iron powder specially processed for use in aluminium alloying applications. Our iron powder enables precise iron addition and uniform alloy chemistry.',
      sections: [
        {
          title: 'Plain Iron Powders',
          description: 'High purity atomised iron powders for aluminium alloying',
          items: [
            { name: 'PHC 40.29', description: 'High purity atomised iron powder with 40 mesh and 2.90 apparent density mostly used in aluminium alloying applications.' }
          ],
          borderColor: 'border-[#937e4f]'
        }
      ]
    }
  },
  {
    id: 5,
    slug: 'gas-cutting',
    title: 'Gas Cutting',
    image: '/images/gascutting.jpg',
    shortDescription:
      'P P Patel Metal Powders offers high-performance iron powder specially developed for powder-assisted gas cutting and oxy-fuel cutting applications.',
    fullDescription: `P P Patel Metal Powders offers high-performance iron powder specially developed for powder-assisted gas cutting and oxy-fuel cutting applications. Our iron powder enhances cutting efficiency by generating additional heat through rapid oxidation in the oxygen stream, enabling smooth and precise cutting of thick and hard-to-cut steels.

Manufactured under strict quality control, our gas cutting grade iron powder ensures consistent particle size, excellent flowability, and high oxygen reactivity, resulting in faster cutting speeds, cleaner cut edges, and reduced oxygen consumption.

Key Features:
• Optimized particle size for stable powder injection
• High iron purity for efficient combustion
• Excellent flow characteristics for uninterrupted feeding
• Instant ignition in oxygen stream
• Dry, non-caking, and free-flowing powder

Typical Specifications:
• Particle Size: 80–120 mesh (custom ranges available)
• Iron (Fe): ≥ 99%
• Carbon / Sulphur / Phosphorus: Very low
• Apparent Density: 2.5 – 3.5 g/cc
• Moisture: ≤ 0.1%

Benefits in Gas Cutting:
• Increases cutting temperature and penetration
• Improves cutting speed on thick sections
• Produces smooth, clean cut surfaces
• Reduces oxygen consumption
• Enables cutting of alloy and difficult-to-cut steels

Applications:
• Oxy-fuel and powder-assisted gas cutting
• Cutting of thick carbon steel plates
• Alloy and stainless steel cutting
• Foundry riser cutting
• Heavy fabrication, shipbuilding, and demolition`,
    features: [
      'Optimized particle size for stable powder injection',
      'High iron purity for efficient combustion',
      'Excellent flow characteristics for uninterrupted feeding',
      'Instant ignition in oxygen stream',
      'Dry, non-caking, and free-flowing powder'
    ],
  }
];

export function getApplicationBySlug(slug: string) {
  return applications.find((a) => a.slug === slug);
}
