import mongoose from 'mongoose';
import config from '../config';
import Icon from '../modules/icon/icon.model';
import { icons } from '../modules/icon/icons.constants';

export const seedIcons = async () => {
  console.log('Icons seeding started');
  try {
    // Use Promise.all to wait for all update operations to complete
    await Promise.all(
      icons.map(async (icon, i) => {
        try {
          await Icon.updateOne(
            { name: icon },
            { name: icon },
            { upsert: true },
          );
          console.log(`${i + 1} icon seeded!`);
        } catch (error) {
          console.log(`Error for ${i + 1}`, error);
        }
      }),
    );
    console.log('All icons seeded successfully!');
  } catch (error) {
    console.log('Error seeding icons:', error);
  }
};

const seed = async () => {
  console.log('Seeding started!');
  try {
    await mongoose.connect(config.database_url!);
    await seedIcons();
  } catch (error: any) {
    console.log(error?.message || error);
  } finally {
    await mongoose.connection.close();
    console.log('Seeding completed.');
  }
};

seed().catch(console.error);
