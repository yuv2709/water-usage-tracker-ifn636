const chai = require('chai');
const sinon = require('sinon');
const mongoose = require('mongoose');

const Device = require('../models/Device');
const WaterUsage = require('../models/WaterUsage');
const { createDevice } = require('../controllers/deviceController');

const expect = chai.expect;

describe('Create Device Function Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('should create a new device successfully', async function () {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        deviceId: 'WUT-2377',
        deviceName: 'Bathroom Meter',
        location: 'Bathroom',
        status: 'Connected',
        dailyThreshold: 150,
      },
    };

    const createdDevice = {
      _id: new mongoose.Types.ObjectId(),
      userId: req.user.id,
      ...req.body,
    };

    const createDeviceStub = sinon.stub(Device, 'create').resolves(createdDevice);
    const createUsageStub = sinon.stub(WaterUsage, 'create').resolves({});

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await createDevice(req, res);

    expect(createDeviceStub.calledOnce).to.be.true;
    expect(createUsageStub.calledOnce).to.be.true;
    expect(res.status.calledWith(201)).to.be.true;
    expect(res.json.calledWith(createdDevice)).to.be.true;
  });

  it('should return 500 if an error occurs', async function () {
    const req = {
      user: { id: new mongoose.Types.ObjectId() },
      body: {
        deviceId: 'WUT-2377',
        deviceName: 'Bathroom Meter',
        location: 'Bathroom',
        status: 'Connected',
        dailyThreshold: 150,
      },
    };

    sinon.stub(Device, 'create').throws(new Error('DB Error'));

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.spy(),
    };

    await createDevice(req, res);

    expect(res.status.calledWith(500)).to.be.true;
    expect(res.json.calledWithMatch({ message: 'DB Error' })).to.be.true;
  });
});