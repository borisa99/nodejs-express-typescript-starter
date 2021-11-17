import Model from '@shared/Model'

class TestFile extends Model{

  constructor() {
    super()
  }
}

const files = new TestFile();

new TestFile().db.insert<TestFile>(files);
