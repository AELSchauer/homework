class PlanTable
  attr_reader :plans_csv

  def initialize
    @plans_csv = CSV.open("./data/plans.csv", headers: true, header_converters: :symbol).read
  end

  def find(rate_area, state, metal_level)
    plans_csv.find_all do |row|
      row[:rate_area] == rate_area && row[:state] == state && row[:metal_level] == metal_level
    end
  end
end
