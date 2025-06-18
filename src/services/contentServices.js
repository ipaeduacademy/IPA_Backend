const db = require('../configs/dbConfigs').getDb();
const { ObjectId } = require('mongodb');

exports.addMainSlide = async (title, url) => {
  const slider = {
    title: title,
    url: url,
  };
  try {
    await db.collection('slider').insertOne(slider);
    return {
      status: 201,
      data: { success: true, message: 'Main slide added successfully' },
    };
  }catch (error) {
    console.error('Error adding main slide:', error);
    return {
      status: 500,
      data: { success: false, error: 'Internal server error' },
    };
  }
}

exports.getMainSlide = async () => {
  try {
    const slides = await db.collection('slider').find().toArray();
    return {
      status: 200,
      data: { success: true, slides },
    };
  } catch (error) {
    console.error('Error fetching main slides:', error);
    return {
      status: 500,
      data: { success: false, error: 'Internal server error' },
    };
  }
};  

exports.updateMainSlide = async (mainSlide, id) => {
  try {
    const result = await db.collection('slider').updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: mainSlide }
    );
    if (result.modifiedCount === 0) {
      return {
        status: 404,
        data: { success: false, message: 'Main slide not found' },
      };
    }
    return {
      status: 200,
      data: { success: true, message: 'Main slide updated successfully' },
    };
  } catch (error) {
    console.error('Error updating main slide:', error);
    return {
      status: 500,
      data: { success: false, error: 'Internal server error' },
    };
  }
};

exports.deleteMainSlide = async (id) => {
  try {
    const result = await db.collection('slider').deleteOne({ _id: ObjectId.createFromHexString(id) });
    if (result.deletedCount === 0) {
      return {
        status: 404,
        data: { success: false, message: 'Main slide not found' },
      };
    }
    return {
      status: 200,
      data: { success: true, message: 'Main slide deleted successfully' },
    };
  } catch (error) {
    console.error('Error deleting main slide:', error);
    return {
      status: 500,
      data: { success: false, error: 'Internal server error' },
    };
  }
};

exports.addFacultySlide = async (name, designation, url) => {
  const facultySlide = {
    name: name,
    designation: designation,
    url: url,
  };
  try {
    await db.collection('faculty').insertOne(facultySlide);
    return {
      status: 201,
      data: { success: true, message: 'Faculty slide added successfully' },
    };
  } catch (error) {
    console.error('Error adding faculty slide:', error);
    return {
      status: 500,
      data: { success: false, error: 'Internal server error' },
    };
  }
};

exports.getFacultySlide = async () => {
  try {
    const slides = await db.collection('faculty').find().toArray();
    return {
      status: 200,
      data: { success: true, slides },
    };
  } catch (error) {
    console.error('Error fetching faculty slides:', error);
    return {
      status: 500,
      data: { success: false, error: 'Internal server error' },
    };
  }
};

exports.updateFacultySlide = async (facultySlide, id) => {
  try {
    const result = await db.collection('faculty').updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: facultySlide }
    );
    if (result.modifiedCount === 0) {
      return {
        status: 404,
        data: { success: false, message: 'Faculty slide not found' },
      };
    }
    return {
      status: 200,
      data: { success: true, message: 'Faculty slide updated successfully' },
    };
  } catch (error) {
    console.error('Error updating faculty slide:', error);
    return {
      status: 500,
      data: { success: false, error: 'Internal server error' },
    };
  }
};  

exports.deleteFacultySlide = async (id) => {
  try {
    const result = await db.collection('faculty').deleteOne({ _id: ObjectId.createFromHexString(id) });
    if (result.deletedCount === 0) {
      return {
        status: 404,
        data: { success: false, message: 'Faculty slide not found' },
      };
    }
    return {
      status: 200,
      data: { success: true, message: 'Faculty slide deleted successfully' },
    };
  } catch (error) {
    console.error('Error deleting faculty slide:', error);
    return {
      status: 500,
      data: { success: false, error: 'Internal server error' },
    };
  }
};