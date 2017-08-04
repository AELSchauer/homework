require_relative '../lib/zip_code'

class ZipCodeTable
  def initialize
    @zips_csv = CSV.open("./data/zips.csv", headers: true, header_converters: :symbol).read
  end

  def find(zip_code)
    rows = @zips_csv.find_all { |row| row[:zipcode] == zip_code }
    ZipCode.new(rows)
  end
end
