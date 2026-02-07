require 'json'

f = File.read("./data.json")

j = JSON.parse(f)

lefts = []
rights = []

j["birds"].each do |bird|
  unless lefts.include? bird["left"]
    lefts.append bird["left"]
  end
  unless rights.include? bird["right"]
    rights.append bird["right"]
  end
end

lefts.sort!
rights.sort!

def print_list(l)
  print "["
  l.each_with_index do |x, idx|
    print '"%s"' % [x]
    unless idx == l.size - 1
      print ","
    end
  end
  puts "]"
end

puts "Lefts: "
print_list lefts
puts "Rights: "
print_list rights
