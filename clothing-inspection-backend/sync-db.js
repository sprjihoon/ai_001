const sequelize = require('./config/database');
const User = require('./models/user');
const Clothes = require('./models/clothes');
const Inspection = require('./models/inspection');
const Product = require('./models/product');
const bcrypt = require('bcrypt');

async function syncDatabase() {
  try {
    // 데이터베이스 동기화 (force: true로 테이블 재생성)
    await sequelize.sync({ force: true });
    console.log('데이터베이스 동기화 완료');

    // 기본 관리자 계정 생성
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      username: 'admin',
      password: adminPassword,
      role: 'admin'
    });
    console.log('기본 관리자 계정이 생성되었습니다.');

    // 운영자 계정 생성
    const operatorPassword = await bcrypt.hash('op123', 10);
    
    await User.create({
      username: 'op1',
      email: 'op1@naver.com',
      password: operatorPassword,
      company: '테스트업체1',
      role: 'operator'
    });

    await User.create({
      username: 'op2',
      email: 'op2@naver.com',
      password: operatorPassword,
      company: '테스트업체2',
      role: 'operator'
    });

    await User.create({
      username: 'op3',
      email: 'op3@naver.com',
      password: operatorPassword,
      company: '테스트업체3',
      role: 'operator'
    });

    console.log('운영자 계정이 생성되었습니다.');
    console.log('데이터베이스 동기화가 완료되었습니다.');
    process.exit(0);
  } catch (error) {
    console.error('데이터베이스 동기화 중 오류 발생:', error);
    process.exit(1);
  }
}

syncDatabase(); 