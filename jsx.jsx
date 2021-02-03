function sample1(){
  return (
    <View>
      <span>first content</span>
      <span>second content</span>
    </View>
  );
}

function sample2(){
  let arr = [1, 2, 3, 4, 5];
  return (
    <View>
      <span>Title</span>
      <div>
        { arr.map(i => 
          <View>
            <span>content {i}</span>
          </View>
        ).join('') }
      </div>
    </View>
  );
}